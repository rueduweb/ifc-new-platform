import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { navbarData } from './nav-data';
import { RouterLink } from "@angular/router";
import { SidenavToggle } from '../shared/utils/interfaces/sidenav-toggle';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {

  public onToggleSidenav = output<SidenavToggle>();
  public screenWidth = signal<number>(0);
  public collapsed = signal<boolean>(false);
  public navData = signal(navbarData);

  toggleCollapse(): void {
    this.collapsed.set(!this.collapsed());
    this.onToggleSidenav.emit({screenWidth: this.screenWidth(), collapsed: this.collapsed()});
  }

  closeSidenav(): void {
    this.collapsed.set(false);
    this.onToggleSidenav.emit({screenWidth: this.screenWidth(), collapsed: this.collapsed()});
  }
}
