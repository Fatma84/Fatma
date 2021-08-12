import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConversationForm } from '../core/modals/conversation/conversation.interface';
import { SayHelloForm } from '../core/modals/say-hello/sayHelloForm.interface';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private firestore: AngularFirestore) {}

  sendSayHelloForm(sayHelloForm: SayHelloForm) {
    return this.firestore.collection('sayHello').add(sayHelloForm);
  }
  sendConversationForm(conversationForm: ConversationForm) {
    return this.firestore.collection('conversation').add(conversationForm);
  }
}
