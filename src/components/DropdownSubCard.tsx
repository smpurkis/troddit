import { useRouter } from "next/router";
import Image from "next/dist/client/image";
import { useState, useEffect } from "react";
import DropdownItem from "./DropdownItem";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {ImSpinner2} from 'react-icons/im'

import { subToSub } from "../RedditAPI";

const DropdownSubCard = ({ sub, mySubs, refresh }) => {
  const [loaded, setLoaded] = useState(false);
  const [loadAPI, setloadAPI] = useState(false);
  const [subbed, setSubbed] = useState(false);

  useEffect(() => {
    //console.log(mySubs);
    //console.log(sub);
    const thissub = sub?.data?.name;
    mySubs.forEach((s) => {
      if (s?.data?.name == thissub) {
        setSubbed(true);
        setLoaded(true);
        setloadAPI(false);

      }
    });
    setLoaded(true);
    setloadAPI(false);

    return () => {
      setSubbed(false);
      setLoaded(false);
      setloadAPI(false);
    };
  }, [sub, mySubs]);

  const subscribe = async (follow) => {
    //console.log(sub?.data?.name);
    setloadAPI(true);
    let action = "";
    if (follow) {
      action = "sub";
    } else {
      action = "unsub";
    }
    let status = await subToSub(action, sub?.data?.name);
    if (status) {
      refresh();
    }
    
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <DropdownItem sub={sub} />
      {/* <div>{sub?.data?.subscribers}</div> */}
      {loaded && (
        <div className="relative">
        <div className="p-1 rounded cursor-pointer dark:hover:bg-darkBorder hover:bg-lightHighlight group">
          {(subbed && !loadAPI)  ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                subscribe(false);
              }}
            >
              <AiOutlineMinus />
            </div>
          ) : (!subbed && !loadAPI) ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                subscribe(true);
              }}
            >
              <AiOutlinePlus />
            </div>
          ) : (loadAPI) ? 
              <div className="animate-spin">
                <ImSpinner2/>
              </div> : ""
        }
        </div>
        {/* <div className="absolute top-0 -right-10 group-hover:block">Follow</div> */}
        </div>
      )}
    </div>
  );
};

export default DropdownSubCard;