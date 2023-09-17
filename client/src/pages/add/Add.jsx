import React, { useReducer, useState } from 'react';
import './Add.scss';
import { INTIAL_STATE, gigReducer } from '../../reducers/gigReducer';
import upload from '../../utils/upload';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [state, dispatch] = useReducer(gigReducer, INTIAL_STATE);
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post(`/gigs/create/`, gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('myGigs');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(state);

    navigate('/myGigs');
  };

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_FEATURE',
      payload: e.target[0].value,
    });
    e.target[0].value = '';
  };

  const handleUpload = async (e) => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        }),
      );
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gigs</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInput">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />

                <label htmlFor="">Upload Image</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading ? true : false}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              id=""
              cols="30"
              rows="16"
              placeholder="Brief descriptions to introduce your service to customers"
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              name="shortTitle"
              type="text"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              min={1}
              onChange={handleChange}
            />

            <label htmlFor="">Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>

            {state.features?.map((f) => (
              <div className="addedFeatures" key={f}>
                <div className="item">
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FEATURE', payload: f })
                    }
                  >
                    {f} <span>X</span>
                  </button>
                </div>
              </div>
            ))}
            <label htmlFor="">Price</label>
            <input name="price" type="number" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
