import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    if (onEdit) {
      setNome(onEdit.nome);
      setEmail(onEdit.email);
      setFone(onEdit.fone);
      setDataNascimento(onEdit.data_nascimento);
    }
  }, [onEdit]);

  const clearForm = () => {
    setNome("");
    setEmail("");
    setFone("");
    setDataNascimento("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !email || !fone || !dataNascimento) {
      return toast.warn("Preencha todos os campos!");
    }

    const payload = {
      nome,
      email,
      fone,
      data_nascimento: dataNascimento,
    };

    try {
      if (onEdit) {
        const { data } = await axios.put(
          `http://localhost:8800/${onEdit.id}`,
          payload
        );
        toast.success(data);
      } else {
        const { data } = await axios.post(
          "http://localhost:8800/",
          payload
        );
        toast.success(data);
      }
      clearForm();
      setOnEdit(null);
      getUsers();
    } catch (err) {
      const message = err.response?.data || err.message;
      toast.error(message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputArea>

      <InputArea>
        <Label>Telefone</Label>
        <Input
          name="fone"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
        />
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input
          name="data_nascimento"
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
