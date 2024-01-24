import React, { useEffect, useState } from 'react';
import Raise from '../../components/Raise';

import { NavLink, useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

const notify = () => toast.success('success');

export default function Detail() {
    // const { id } = useParams();

    // const [project, setProject] = useState([]);
    // const fetchProject = (id: string) => {
    //     // Where we're fetching data from
    //     return (
    //         fetch(`https://api.solanapad.io/project/${id}`, {
    //             method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //             mode: 'cors', // no-cors, *cors, same-origin
    //             cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //             credentials: 'same-origin', // include, *same-origin, omit
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             redirect: 'follow', // manual, *follow, error
    //             referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //         })
    //             // We get the API response and receive data in JSON format
    //             .then((response) => response.json())
    //             .then((data) => setProject(data))
    //             .catch((error) => console.error(error))
    //     );
    // };

    // useEffect(() => {
    //     fetchProject(id);
    // }, [id]);

    return (
        <div className="relative  py-10">
            <div className="container mx-auto px-2 lg:px-5">
                <NavLink className="text-xl font-bold flex gap-2 items-center" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <mask id="mask0_82_6259" maskUnits="userSpaceOnUse" x="0" y="0" width="38" height="38">
                            <rect width="38" height="38" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_82_6259)">
                            <path
                                d="M25.3333 34.8332L9.5 18.9998L25.3333 3.1665L28.1438 5.97692L15.1208 18.9998L28.1438 32.0228L25.3333 34.8332Z"
                                fill="white"
                            />
                        </g>
                    </svg>
                    <span>Back to Home</span>
                </NavLink>
            </div>

            <Raise />

            {/* <div className="py-10 w-full flex justify-center items-center">
                <button className="inline-flex justify-center bg-blue-600 px-8 py-4 rounded-full" onClick={notify}>
                    Hello
                </button>
            </div> */}
        </div>
    );
}
