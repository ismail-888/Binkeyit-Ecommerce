import toast from "react-hot-toast"

const AxiosToastError=(error)=>{
    toast.error(error?.response?.data?.message || "axios error")
    console.log(error?.response)
}

export default AxiosToastError