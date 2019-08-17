import React from "react"


const SnackbarContext = React.createContext({
    variant: "", message: "", openSnackbar: () => {
    }
})

export default SnackbarContext
