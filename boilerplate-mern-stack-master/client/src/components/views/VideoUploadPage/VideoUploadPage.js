import React from 'react';
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from 'react-dropzone';

const { TextArea } = Input
const { Title } = Typography


const VideoUploadPage = () => {
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone></Dropzone>
                 
                  <div>
                      <img src alt />
                  </div>
                </div>
                <label>Title</label>
                <Input />
                <label>Description</label>
                <TextArea />
                <br />
                <br />

                <select>
                    <option key value></option>
                </select>

                <select>
                    <option key value></option>
                </select>

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
           
        </div>
    )
}

export default VideoUploadPage;