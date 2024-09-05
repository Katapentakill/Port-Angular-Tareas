import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task, UserDto, UserProfileRecommend } from '../../models/task.model';
import { UserService } from 'src/app/services/user.service';
import { RecommendedService } from 'src/app/services/recommended.service';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './details-task-modal.component.html',
})
export class TaskDetailsModalComponent implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter<void>();
  userTask: UserDto | null = null;
  isTagSelectionModalOpen = false;
  recommendedUsers: UserDto[] = [];
  isLoading: boolean = false;
  isUserModalOpen: boolean = false;
  isUserModalOpenRecommend: boolean = false;

  constructor(
    private userService: UserService,
    private recommendedService: RecommendedService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.isUserModalOpen) {
      this.loadUserData();
    }
  }

  private loadUserData(): void {
    if (this.task && this.task.userId !== undefined && this.task.userId !== null) {
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
    console.log('Cerrando modal de detalles de tarea');
    this.close.emit();
  }

  openTagSelectionModal(): void {
    this.isTagSelectionModalOpen = true;
  }

  closeTagSelectionModal(): void {
    this.isTagSelectionModalOpen = false;
  }

  openUserModal(): void {
    console.log('Abriendo modal de usuarios');
    this.isUserModalOpen = true;
  }

  closeUserModal(): void {
    console.log('Cerrando modal de usuarios');
    this.isUserModalOpen = false;
  }

  closeUserModalRecommend(): void {
    console.log('Cerrando modal de usuarios recomendados');
    this.isUserModalOpenRecommend = false;
  }

  getRecommendations(): void {
      if (this.task) {
          this.isLoading = true;
          const requiredSkillsNormalized = this.task.requiredSkillsNormalized ?? '';
          const requiredExpertiseNormalized = this.task.requiredExpertiseNormalized ?? '';
          const descriptionNormalized = this.task.descriptionNormalized ?? '';

          this.recommendedService.getSimilarity(
              requiredSkillsNormalized,
              requiredExpertiseNormalized,
              descriptionNormalized
          ).subscribe(
              (recommendedProfiles: UserProfileRecommend[]) => {
                  const recommendedEmails = recommendedProfiles.map(profile => profile.email);
                  
                  // Mapeo de email a similarity para fácil acceso
                  const emailToSimilarityMap = new Map(recommendedProfiles.map(profile => [profile.email, profile.similarity]));

                  this.userService.getAllUsers().subscribe(
                      (allUsers: UserDto[]) => {
                          this.recommendedUsers = allUsers
                              .filter(user => recommendedEmails.includes(user.email))
                              .map(user => {
                                  // Agregar la propiedad similarity si coincide el email
                                  user.similarity = emailToSimilarityMap.get(user.email);
                                  return user;
                              });
                          
                          console.log('Usuarios recomendados:', this.recommendedUsers);
                          this.isLoading = false;
                          this.isUserModalOpenRecommend = true; // Abre el modal después de obtener las recomendaciones
                      },
                      (error) => {
                          console.error('Error fetching all users:', error);
                          this.isLoading = false;
                      }
                  );
              },
              (error) => {
                  console.error('Error fetching recommendations:', error);
                  this.isLoading = false;
              }
          );
      }
  }
}
