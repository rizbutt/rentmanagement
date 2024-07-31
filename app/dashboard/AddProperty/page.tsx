"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Finalized from '../../components/AddProperty/Finalization/page';


import "../../globals.css";

const AddProperty = () => {
    return (
         <div>
            <Navbar  />
         <Finalized />
        </div> 
    )
}

export default AddProperty;