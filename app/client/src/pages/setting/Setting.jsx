import React, {useState} from 'react'
import axios from 'axios';

import './setting.scss'
import apiConfig from '../../api/serverAPI/apiConfig';

//import userAPI from '../../api/serverAPI/userAPI';

const Setting = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const upload = async () => {
        if (selectedImage) {
            const token = localStorage.getItem('token')
            if (!token) return
            //userAPI.upLoadAvatar(selectedImage, token).catch(err => {console.log('err', err)})
            const formData = new FormData();
            formData.append("image", selectedImage);
         
            axios({
                method: "post",
                url: `${apiConfig.baseURL}/user/upload-avatar`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data", "x_authorization" : token },
            })
            .then(res => {
                console.log('ok')
                const user = JSON.parse(localStorage.getItem('user'))
                user.avatar = res.data.avatar
                localStorage.setItem('user', JSON.stringify(user))
            })
            .catch(err => console.log(err));
           
        }
    }

    return (
        <div className='setting'>
            <div>
                <h1>Upload and Display Image usign React Hooks</h1>
                {selectedImage && (
                    <div>
                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
    
                        <br />
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}
                <br />

                <br />
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {

                        setSelectedImage(event.target.files[0]);
                    }}
                />
                <button onClick={upload}>Submit</button>
            </div>
        </div>
    )
}

export default Setting