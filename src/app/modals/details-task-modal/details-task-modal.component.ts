import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task, UserDto, UserProfileRecommend } from '../../models/task.model';
import { UserService } from 'src/app/services/user.service';
import { RecommendedService } from 'src/app/services/recommended.service';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './details-task-modal.component.html',
})
export class TaskDetailsModalComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  userTask: UserDto | null = null;
  isTagSelectionModalOpen = false;
  recommendedUsers: UserDto[] = []; // Variable para almacenar usuarios recomendados

  constructor(
    private userService: UserService,
    private recommendedService: RecommendedService
  ) {}

  ngOnInit(): void {
    if (this.task && this.task.userId !== undefined && this.task.userId !== null) {
      console.log("id de usuario en tarea: ", this.task.userId)
      this.userService.getUserById(this.task.userId).subscribe(
        (user: UserDto) => {
          this.userTask = user;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  openTagSelectionModal(): void {
    this.isTagSelectionModalOpen = true;
  }

  closeTagSelectionModal(): void {
    this.isTagSelectionModalOpen = false;
  }

  getRecommendations(): void {
    if (this.task) {
      // Obtener los datos para enviar
      const requiredSkillsNormalized = this.task.requiredSkillsNormalized ?? '';
      const requiredExpertiseNormalized = this.task.requiredExpertiseNormalized ?? '';
      const descriptionNormalized = this.task.descriptionNormalized ?? '';

      // Imprimir los datos en la consola
      console.log('Datos enviados a la solicitud de recomendaciones:');
      console.log('requiredSkillsNormalized:', requiredSkillsNormalized);
      console.log('requiredExpertiseNormalized:', requiredExpertiseNormalized);
      console.log('descriptionNormalized:', descriptionNormalized);

      this.recommendedService.getSimilarity(
        requiredSkillsNormalized,
        requiredExpertiseNormalized,
        descriptionNormalized
      ).subscribe(
        (recommendedProfiles: UserProfileRecommend[]) => {
          console.log('Datos de usuarios recomendados recibidos:');
          console.log(recommendedProfiles);

          const recommendedEmails = recommendedProfiles.map(profile => profile.email);
          console.log('Emails recomendados:', recommendedEmails);

          // Obtener todos los usuarios
          this.userService.getAllUsers().subscribe(
            (allUsers: UserDto[]) => {
              console.log('Datos de todos los usuarios recibidos:');
              console.log(allUsers);

              // Filtrar los usuarios recomendados
              this.recommendedUsers = allUsers.filter(user => recommendedEmails.includes(user.email));
              console.log('Usuarios recomendados filtrados:');
              console.log(this.recommendedUsers);
            },
            (error) => {
              console.error('Error fetching all users:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching recommendations:', error);
        }
      );
    }
  }
}
