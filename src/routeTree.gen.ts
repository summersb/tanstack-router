/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users/index'
import { Route as TodosIndexImport } from './routes/todos/index'
import { Route as TodosTodoIdImport } from './routes/todos/$todoId'
import { Route as UsersUserIdIndexImport } from './routes/users/$userId/index'
import { Route as UsersUserIdEditImport } from './routes/users/$userId/edit'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

const TodosIndexRoute = TodosIndexImport.update({
  id: '/todos/',
  path: '/todos/',
  getParentRoute: () => rootRoute,
} as any)

const TodosTodoIdRoute = TodosTodoIdImport.update({
  id: '/todos/$todoId',
  path: '/todos/$todoId',
  getParentRoute: () => rootRoute,
} as any)

const UsersUserIdIndexRoute = UsersUserIdIndexImport.update({
  id: '/users/$userId/',
  path: '/users/$userId/',
  getParentRoute: () => rootRoute,
} as any)

const UsersUserIdEditRoute = UsersUserIdEditImport.update({
  id: '/users/$userId/edit',
  path: '/users/$userId/edit',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/todos/$todoId': {
      id: '/todos/$todoId'
      path: '/todos/$todoId'
      fullPath: '/todos/$todoId'
      preLoaderRoute: typeof TodosTodoIdImport
      parentRoute: typeof rootRoute
    }
    '/todos/': {
      id: '/todos/'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof TodosIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      id: '/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/$userId/edit': {
      id: '/users/$userId/edit'
      path: '/users/$userId/edit'
      fullPath: '/users/$userId/edit'
      preLoaderRoute: typeof UsersUserIdEditImport
      parentRoute: typeof rootRoute
    }
    '/users/$userId/': {
      id: '/users/$userId/'
      path: '/users/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof UsersUserIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/todos/$todoId': typeof TodosTodoIdRoute
  '/todos': typeof TodosIndexRoute
  '/users': typeof UsersIndexRoute
  '/users/$userId/edit': typeof UsersUserIdEditRoute
  '/users/$userId': typeof UsersUserIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/todos/$todoId': typeof TodosTodoIdRoute
  '/todos': typeof TodosIndexRoute
  '/users': typeof UsersIndexRoute
  '/users/$userId/edit': typeof UsersUserIdEditRoute
  '/users/$userId': typeof UsersUserIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/todos/$todoId': typeof TodosTodoIdRoute
  '/todos/': typeof TodosIndexRoute
  '/users/': typeof UsersIndexRoute
  '/users/$userId/edit': typeof UsersUserIdEditRoute
  '/users/$userId/': typeof UsersUserIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/todos/$todoId'
    | '/todos'
    | '/users'
    | '/users/$userId/edit'
    | '/users/$userId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/todos/$todoId'
    | '/todos'
    | '/users'
    | '/users/$userId/edit'
    | '/users/$userId'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/todos/$todoId'
    | '/todos/'
    | '/users/'
    | '/users/$userId/edit'
    | '/users/$userId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  TodosTodoIdRoute: typeof TodosTodoIdRoute
  TodosIndexRoute: typeof TodosIndexRoute
  UsersIndexRoute: typeof UsersIndexRoute
  UsersUserIdEditRoute: typeof UsersUserIdEditRoute
  UsersUserIdIndexRoute: typeof UsersUserIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  TodosTodoIdRoute: TodosTodoIdRoute,
  TodosIndexRoute: TodosIndexRoute,
  UsersIndexRoute: UsersIndexRoute,
  UsersUserIdEditRoute: UsersUserIdEditRoute,
  UsersUserIdIndexRoute: UsersUserIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/todos/$todoId",
        "/todos/",
        "/users/",
        "/users/$userId/edit",
        "/users/$userId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/todos/$todoId": {
      "filePath": "todos/$todoId.tsx"
    },
    "/todos/": {
      "filePath": "todos/index.tsx"
    },
    "/users/": {
      "filePath": "users/index.tsx"
    },
    "/users/$userId/edit": {
      "filePath": "users/$userId/edit.tsx"
    },
    "/users/$userId/": {
      "filePath": "users/$userId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
