/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useEffect } from "react"
import { createContext } from "react"
import { useSelector } from "react-redux"
import axiosInstance from "../api/axiosConfig"

export let PlaylistContext = createContext()


let PlaylistProvider = ({ children }) => {

    let [playlistById, setPlaylistById] = useState([])
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState(null)
    let { userObject } = useSelector((state) => state.account)

    console.log("User Object in PlaylistContext:", userObject)
    
    let getAllPlaylistById = async () => {
        let userId = userObject ? userObject._id : null
        console.log("Fetching playlists for user ID:", userId)
        if (!userId) {
            console.log("No user ID provided")
            return
        }
        
        setLoading(true)
        setError(null)
        try {
            let res = await axiosInstance.get(`/playlist/getAllPlaylistById?userid=${userId}`)
            if (res.data.data) {
                setPlaylistById(res.data.data)
            }
        }
        catch (err) {
            console.log("Error fetching playlists:", err)
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    // Fetch playlists when userObject becomes available
    useEffect(() => {
        if (userObject && userObject._id) {
            getAllPlaylistById()
        }
    }, [userObject])

    return <PlaylistContext.Provider value={{ getAllPlaylistById, playlistById, loading, error }}>
        {children}
    </PlaylistContext.Provider>
}

export default PlaylistProvider