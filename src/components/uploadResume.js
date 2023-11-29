import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from "styled-components";
import { icons } from "../utils/images";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents


        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <MyDropzoneWrapper> 
        <div className='flex flex-center' {...getRootProps()}>
          <input {...getInputProps()} />
          <img src={icons.file} alt='file' />
          <p>Browse your files to upload your Resume</p>
        </div>
    </MyDropzoneWrapper>
  )
}

const MyDropzoneWrapper = styled.div`
    padding: 2.5rem 22rem;
    border: 2px dashed var(--clr-black);
    border-radius: 1rem;
    background: var(--clr-default-light);
    p {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--clr-light-grey);
    }
    img {
        width: 5rem;
        height: 6rem;
        margin-right: 1rem;
    }

    @media screen and (max-width: 1280px) { 
      padding: 2.5rem 25rem;
    }

    @media screen and (max-width: 1024px) { 
        padding: 2.5rem 24rem;
        img {
            width: 4.5rem;
            height: 5.5rem;
        }
    }

    @media screen and (max-width: 900px) { 
      padding: 2.5rem 23rem;
    }

    @media screen and (max-width: 826px) {
      padding: 2.5rem 20rem;
    }

    @media screen and (max-width: 767px) {
      padding: 2.5rem 19rem;
    }

    @media screen and (max-width: 610px) {
      padding: 2.5rem 11rem;
    }

    @media screen and (max-width: 420px) { 
        padding: 2.5rem 1rem;

        img {
            width: 3.5rem;
            height: 4.5rem;
            margin-right: 0.4rem;
        }
    }
`;



export default MyDropzone;