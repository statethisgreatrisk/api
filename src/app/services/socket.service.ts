import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit, Job } from '../store/interfaces/app.interface';
import { environment } from '../../environment';
import { addJob } from '../store/actions/app.action';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public socket: WebSocket | null = null;

    constructor(private store: Store<AppStateInit>) {}

    async init(deploymentDomain: string) {
        if (this.socket) return;

        return new Promise((resolve, reject) => {
            try {
                this.socket = new WebSocket(this.socketUrl(deploymentDomain));

                this.socket!.addEventListener('message', (event) => this.onMessage(event.data));
                this.socket!.addEventListener('open', (event) => resolve(true));
            } catch(error) {
                console.log('WebSocket connection error', error);
                return reject(error);
            }
        });
    }
    
    socketUrl(deploymentDomain: string) {
        if (environment.production) return `ws://${deploymentDomain}.dsptchwrkbx.com:8081`;
        else return `ws://localhost:8081`;
    }

    sendMessage(message: string) {
        if (!this.socket) return;

        this.socket.send(message);
    }

    onMessage(message: string) {
        const socketMessage = JSON.parse(message) as Job;
        console.log('socket message', socketMessage);
        this.store.dispatch(addJob({ job: socketMessage }));
    }

    close(): void {
        if (!this.socket) return;

        this.socket.close();
    }
}
