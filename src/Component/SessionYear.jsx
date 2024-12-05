import React from 'react'
import { useState } from 'react';
import { Input, Space, Button } from "antd";
import { FaPlus } from "react-icons/fa";

const SessionYear = () => {
    const [section, setSection] = useState([]);

    const addSectionPerYear = () => {
        setSection([...section], [""])
      };
  return (
    <div>
        <div className="row mx-5">
            <div className="col-6 px-0">
              <Space.Compact className="w-100 mb-2">
                <Input
                  className="text-center"
                  placeholder="Enter Year"
                />
                <Input
                  className="text-center"
                  placeholder="Enter Number of sections"
                />
                <Button
                  className="btn btn-success d-flex align-items-center"
                  onClick={addSectionPerYear}
                >
                  <FaPlus />
                </Button>
              </Space.Compact>
            </div>
          </div>
    </div>
  )
}

export default SessionYear