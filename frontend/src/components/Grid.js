import React from "react";
import axios from "axios";
import styled from "styled-components";
import {FaTrash, FaEdit} from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
width: 100%;
background-color: #ffff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
max-width: 800px;
margin: 20px auto;
word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;


const Grid = () => {
    return(
        <Table>
            <Thead>
                <Tr>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
                </Tr>
            </Thead>
        </Table>
    );
};

export default Grid