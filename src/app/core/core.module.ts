import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { ToastComponent } from './toast/toast.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

// Modals
import { SayHelloModal } from './modals/say-hello/say-hello.modal';
import { ConversationModal } from './modals/conversation/conversation.modal';
import { AddTestimonialModal } from './modals/add-testimonial/add-testimonial.modal';
import { JoinTeamComponent } from './modals/join-team/join-team.modal';

//Modules
import { SharedModule } from '../shared/shared.module';

const CoreModules = [
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
  ToastComponent,
  SayHelloModal,
  ConversationModal,
  AddTestimonialModal,
  SplashScreenComponent,
  JoinTeamComponent,
];

@NgModule({
  declarations: [CoreModules],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
  exports: [CoreModules],
})
export class CoreModule {}
