import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];




