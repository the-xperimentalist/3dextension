import React, {useState} from 'react'
import {useAuth} from "../contexts/AuthContext";
import AddModel from "./AddModel";

function Home() {
    const {user} = useAuth()
    const [openAddModel, setOpenAddModel] = useState(false)

    return (
        <div>
            <span>Hi <h3>{user.username}</h3></span>

            <button onClick={() => setOpenAddModel(true)}>Add model here</button>
            {openAddModel ? (
                <AddModel setOpenAddModel={setOpenAddModel} />
            ) : null}
        </div>
    )
}

export default Home

// curl --location --request POST 'http://localhost:8000/imageto3d/' \
// --header 'Authorization: Basic c29tZTJAcmFuZG9tLmNvbTpwYXNz' \
// --form 'web_domain=random.com' \
// --form 'image_url=http://image3.url/' \
// --form 'model_file=@/C:/Users/mayan/Downloads/3dexport_mugobj_1600419563/mugobj.obj' \
// --form 'image_name=img123'
