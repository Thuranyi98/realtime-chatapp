import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const setError = (field: keyof T, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearErrors = () => setErrors({});

  const submit = async (handler: (values: T) => Promise<void>) => {
    setIsSubmitting(true);
    try {
      await handler(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, isSubmitting, setValue, setError, clearErrors, submit };
}
