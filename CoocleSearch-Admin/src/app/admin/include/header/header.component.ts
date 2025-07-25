import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  adminInfos: any;
  accessToken: any

  constructor(private router: Router) { }

  toggleSidebar(): void {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width < 1199) {
      $("#main-wrapper").attr("data-sidebartype", "mini-sidebar").addClass("mini-sidebar");
    } else {
      $("#main-wrapper").attr("data-sidebartype", "full").removeClass("mini-sidebar");
    }

    $(window).on("resize", () => {
      const newWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (newWidth < 1199) {
        $("#main-wrapper").attr("data-sidebartype", "mini-sidebar").addClass("mini-sidebar");
      } else {
        $("#main-wrapper").attr("data-sidebartype", "full").removeClass("mini-sidebar");
      }
    });

    $(".sidebartoggler").on("click", function () {
      $("#main-wrapper").toggleClass("mini-sidebar");
      const isMiniSidebar = $("#main-wrapper").hasClass("mini-sidebar");
      $(".sidebartoggler").prop("checked", isMiniSidebar);
      $("#main-wrapper").attr("data-sidebartype", isMiniSidebar ? "mini-sidebar" : "full");
    });

    $(".sidebartoggler").on("click", function () {
      $("#main-wrapper").toggleClass("show-sidebar");
    });
  }

  ngOnInit(): void {
    this.toggleSidebar();
    this.adminInfos = JSON.parse(sessionStorage.getItem('admin_infos') || '{}');
    this.accessToken = sessionStorage.getItem('access_token');
  }


  logout() {
    sessionStorage.removeItem('admin_infos');
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
}
