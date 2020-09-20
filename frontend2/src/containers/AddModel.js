/*global chrome*/
import React, {useCallback, useState} from 'react'
import {Header} from "../components/Styles";
import {Button, Form, FormGroup, Input} from "reactstrap";
import {useAuth} from "../contexts/AuthContext";

function AddModel({setOpenAddModel}) {
    const {user} = useAuth()
    const [imgURL, setImgURL] = useState('')
    const [webDomain, setWebDomain] = useState('')
    const [modelFile, setModelFile] = useState(null)
    const [imageName, setImageName] = useState('')

    const onSubmitHandler = useCallback(() => {
        const formData = new FormData()
        formData.append('web_domain', webDomain)
        formData.append('image_url', imgURL)
        formData.append('model_file', modelFile, modelFile.name)
        formData.append('image_name', imageName)

        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          chrome.runtime.sendMessage({method: "addModel", message: {
              imageName, imgURL, webDomain, modelFile, token: user.token
              }}, function (response) {
              console.log('successfully added image')
            setOpenAddModel(false)
            })
        })
    }, [webDomain, imgURL, modelFile, imageName, user.token, setOpenAddModel])

    return (
        <Form
      onSubmit={e => {
        e.preventDefault();
        if (imgURL !== '' && webDomain !== '' && imageName !== '' && modelFile) {
            onSubmitHandler()
        }
      }}
    >
      <Header>Add Model</Header>
      <br />
      <FormGroup>
        <Input
          type="text"
          name="image-name"
          value={imageName}
          placeholder="Image name"
          onChange={e => setImageName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          name="img-url"
          value={imgURL}
          placeholder="Image URL"
          onChange={e => setImgURL(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          name="web-domain"
          value={webDomain}
          placeholder="Web Domain"
          onChange={e => setWebDomain(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="file"
          name="model-file"
          placeholder="Image URL"
          onChange={e => setModelFile(e.target.files[0])}
        />
      </FormGroup>
      <Button type="submit" block={true}>
        Add
      </Button>
        <Button type="submit" block={true} onClick={() => setOpenAddModel(false)}>
        Cancel
      </Button>
      <br />
    </Form>
    )
}

export default AddModel
