/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    name: 'Panel de Control',
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'Perfil de Usuario',
    view: 'UserProfile'
  },
  {
    path: '/lista-empresas',
    name: 'Listado de Empresas',
    view: 'ListaEmpresas'
  },
  {
    path: '/empresa-form',
    name: 'Editar Empresa',
    view: 'FormEmpresa'
  },
  {
    path: '/lista-personas',
    name: 'Listado de Personas',
    view: 'ListaPersonas'
  },
  {
    path: '/persona-form',
    name: 'Editar Persona',
    view: 'FormPersona'
  },
  {
    path: '/webcam',
    name: 'Tomar Foto',
    view: 'WebCam'
  },
  {
    path: '/table-list',
    name: 'Lista de Visitantes',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  }
]
