import {ChangeDetectionStrategy, Component, EventEmitter, input, Input, model, Output} from '@angular/core';
import {User} from '../user.interface';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

  users = input<User[] |undefined | null>();
  selectedUser = model<User | undefined>(undefined);

  selectUser(user: User){
    this.selectedUser.set(user);
  }


}
