import React from "react";
import axios from "axios";
import styled, { StyleSheetManager } from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import isPropValid from '@emotion/is-prop-valid';

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th.withConfig({
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'onlyWeb'
})`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${props => props.onlyWeb && "display: none;"}
  }
`;

export const Td = styled.td.withConfig({
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'alignCenter' && prop !== 'onlyWeb'
})`
  padding-top: 15px;
  text-align: ${props => (props.alignCenter ? "center" : "start")};
  width: ${props => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${props => props.onlyWeb && "display: none;"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = item => {
    setOnEdit(item);
  };

  const handleDelete = async id => {
    try {
      const { data } = await axios.delete(`http://localhost:8800/${id}`);
      setUsers(users.filter(user => user.id !== id));
      toast.success(data);
      setOnEdit(null);
    } catch (err) {
      const message = err.response?.data || err.message;
      toast.error(message);
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th onlyWeb>Fone</Th>
            <Th />
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td width="30%">{item.nome}</Td>
              <Td width="30%">{item.email}</Td>
              <Td width="20%" onlyWeb>
                {item.fone}
              </Td>
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </StyleSheetManager>
  );
};

export default Grid;
