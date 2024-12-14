import { api } from './api'

const middleware = {
  middleware: (getDefaultMiddleware: any): any =>
    getDefaultMiddleware().concat(api.middleware),
}

export default middleware
