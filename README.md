# React + Vite

# curso-react-practico-desafio

Curso que parte de una tienda en react que deben hacerse algunos cambios simulando una entrevista técnica práctica en ReactJs

# Desafio

1 - Protección de Rutas

2 - Navbar Dinámica

3 - Maquetación de las vistas de usuario

4 - Bonus: Responsive Design para shopi (opcional)

## Protección de rutas

Las rutas de Checkout, Órdenes de compra y Visualización de productos NO deben ser visibles para usuarios sin autenticar:

- Hacer redirect a la página de login si el usuario no está autenticado
- Mostrar común y corriente las páginas anteriormente mencionadas si el usuario ya está autenticado
- Restringir acceso de las paginas `home`, `my-orders`, `my-order` y sus sub-rutas a usuarios auntenticados

## Navbar Dinámica

La navbar o menú principal de la aplicación debe cambiar su estructura dependiendo de si el usuario está autenticado o no:

- Mostrar el correo del usuario (si ya está autenticado)
- Mostrar botón para hacer Sign (si no está autenticado)
- Mostrar los enlaces "Sign out", "My Account", "My Orders" y el "email" cuando un usuario se encuentre autenticado

## Maquetación de las vistas de usuario

1- Vista de página de SignIn (si ya se ha logueado, autocompletar usuario y password con el que estaba)

- Si no tiene datos guardados, se deshabilite el login y ser habilite el Sign up
- Si tiene datos guardados de usuario, se habilita el login y se deshabilita el Sign up.

2 - La vista de de sign-up (dentro de la página de sign-in) con: "Your name", "your email" y "password"

```
  account: {
    name: String
    email: String
    password: String
  }
```

3 - Maquetar interfaz de pagina my-account, la cual, debera mostrar "nombre" y "email" del usuario logueado.

4 - Tener datos en localStorage de las key: sign-out (boolean) y account (datos del usuario, en la prueba no importa si se ve la contraseña pero evitar esto)

5 - Restringir acceso de las paginas sign-in y sign-up a usuarios auntenticados

## Bonus: Responsive Design para shopi (opcional)

1. Responsive design para componente `Navbar`
2. Responsive design para pagina `sign-in`
3. Responsive design para pagina `sign-up`
4. Responsive design para pagina `home`
5. Responsive design para componente `ProductDetail`
6. Responsive design para componente `CheckoutSideMenu`
7. Responsive design para pagina `my-account`
8. Responsive design para pagina `my-orders`
9. Responsive design para pagina `my-order`
