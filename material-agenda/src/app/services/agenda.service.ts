import {combineLatest, map, Observable, switchMap} from 'rxjs';
import {Injectable} from '@angular/core';
import {
    Firestore,
    collectionData,
    collection,
    addDoc,
    deleteDoc,
    doc,
    DocumentData,
    updateDoc,
    getDoc,
} from '@angular/fire/firestore';
import {getDownloadURL, getMetadata, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {Task} from "../interfaces/agenda";

@Injectable({
    providedIn: 'root'
})
export class AgendaService {
    constructor(
        private firestore: Firestore,
        private storage: Storage
    ) {
    }

    //#region Getters
    getTasks(): Promise<Task[]> {
        const taskRef = collection(this.firestore, 'tasks');
        // @ts-ignore
        return collectionData(taskRef, {idField: 'id'}) as Promise<any[]>;
    }

    getTaskById(taskId: string): Observable<Task> {
        const taskRef = doc(this.firestore, 'tasks', taskId);
        return new Observable<Task>(observer => {
            getDoc(taskRef).then(task => {
                observer.next(task.data() as any);
                observer.complete();
            }).catch(error => {
                observer.error(error);
            });
        });
    }

    //#endregion

    //#region Setters
    addTask(task: any) {
        const taskRef = collection(this.firestore, 'tasks');
        return addDoc(taskRef, task);
    }

    updateTask(task: any) {
        const taskRef = collection(this.firestore, 'tasks');
        return updateDoc(doc(taskRef, task.id), task);
    }

    uploadImage(image: any): Promise<any> {
        const imageRef = ref(this.storage, 'images/' + this.idGenerator());
        return uploadBytes(imageRef, image)
            .then(response => {
                // return the download url and the image name
                return combineLatest([
                    getDownloadURL(response.ref),
                    getMetadata(response.ref)
                ]).pipe(
                    map(([url, metadata]) => {
                        return {
                            url,
                            name: metadata.name
                        };
                    })
                ).toPromise();
            })
            .catch(error =>  console.log(error));
    }
    //#endregion

    //#region Deletes
    deleteTask(taskId: string) {
        const taskRef = collection(this.firestore, 'tasks');
        return deleteDoc(doc(taskRef, taskId));
    }
    //#endregion

    //#region Helpers
    idGenerator(): string {
        // letters + numbers
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let autoId = '';
        for (let i = 0; i < 20; i++) {
            autoId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return autoId;
    }

    private isEmpty(obj: any) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }
    //#endregion
}
