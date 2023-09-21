import { useState } from 'react';

function useForms(initialState: any) {
  const [form, setForm] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    setForm,
    handleChange,
  };
}

export default useForms;
