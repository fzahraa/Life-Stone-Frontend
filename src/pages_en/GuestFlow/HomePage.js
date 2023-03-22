import React, { useEffect} from 'react';
import { Navbar } from '../../components_en/Navigations';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { useDispatch} from "react-redux";


const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        // eslint-disable-next-line
    }, [])


    const user = getUserFromLocalStorage();
   
    return (
        <>
            <Navbar></Navbar>
                <div> HomePage </div>
        </>
    );
};

export default HomePage;