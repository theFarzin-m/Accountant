import styled from "styled-components";


const Style = styled.label`
  & input {
    border-radius: 8px;
    outline: none;
    border: 1px solid var(--border-color);
    background-color: var(--bg-p);
    color: var(--c-p);
    width: 100%;
    padding: 4px;
  }
`;

interface InputPropsType {
  children: React.ReactNode;
  label: string;
}

export default function Input({ children, label }: InputPropsType) {
  return (
    <Style className=" w-100">
      <div>{label}</div>
      {children}
    </Style>
  );
}
