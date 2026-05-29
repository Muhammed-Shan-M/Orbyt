
import AppRoutes from './app/routes'
import { Toaster } from "sonner";
import { store } from "./app/store/store";
import { Provider } from "react-redux";
import { ReactQueryProvider } from './app/providers/react-query.provider'

export const App = () => {
 

  return (
    <>
      <ReactQueryProvider>
        <Provider store={store}>

          <Toaster
            position="top-right"
            richColors
            theme="dark"
          />


          <AppRoutes />

        </Provider>
      </ReactQueryProvider>

    </>
  )
}
