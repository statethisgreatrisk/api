import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInit } from '../store/interfaces/app.interface';
import { environment } from '../../environment';
import { addJob, addLogLine } from '../store/actions/app.action';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public socket: WebSocket | null = null;

    constructor(private store: Store<AppStateInit>) {}

    async init(deploymentDomain: string, userId: string) {
        if (this.socket) return;

        return new Promise((resolve, reject) => {
            try {
                this.socket = new WebSocket(this.socketUrl(deploymentDomain));

                this.socket!.addEventListener('message', (event) => this.onMessage(event.data));
                this.socket!.addEventListener('open', (event) => {
                    this.sendMessage(userId);
                    resolve(true);
                });
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
        let socketMessage = JSON.parse(message);

        if (socketMessage.jobId) {
            this.store.dispatch(addJob({ job: socketMessage }));
        } else if (socketMessage.logId) {
            this.store.dispatch(addLogLine({ logId: socketMessage.logId, logLine: socketMessage.logLine }));
        }
    }

    close(): void {
        if (!this.socket) return;

        this.socket.close();
    }
}
