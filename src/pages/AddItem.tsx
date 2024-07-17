import React, { KeyboardEvent, useState } from 'react';
import FileInput from '../components/FileInput';
import icon_tag_remove from '../assets/icon_tag_remove.png';

const INITIAL_VALUES = {
  title: '',
  content: '',
  price: '',
  imgFile: null as File | null,
};

type AddItemProps = {
  initialValues?: typeof INITIAL_VALUES;
  initialPreview?: string;
};

function AddItem({
  initialValues = INITIAL_VALUES,
  initialPreview,
}: AddItemProps) {
  const [values, setValues] = useState<typeof INITIAL_VALUES>(initialValues);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');

  const isDisabled = !values.title || !values.content || !values.price;

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };

  const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputTag) {
      if (!tags.includes(inputTag)) {
        setTags([...tags, inputTag]);
      }
      setInputTag('');
      e.preventDefault();
    }
  };

  const removeTag = (removeTagIndex: number) => {
    const newTags = tags.filter((tag, index) => index !== removeTagIndex);
    setTags(newTags);
  };

  const handleChange = (name: string, value: any) => {
    if (name === 'imgFile' && value instanceof File) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      const formatPrice = (value: string) => {
        const numericValue = value.replace(/[^0-9,]/g, '');
        const rawNumbers = numericValue.replace(/,/g, '');
        return rawNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
      setValues((prevValues) => ({
        ...prevValues,
        [name]: name === 'price' ? formatPrice(value) : value,
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('price', values.price);
    if (values.imgFile) {
      formData.append('imgFile', values.imgFile);
    }
    setValues(INITIAL_VALUES);
  };

  return (
    <div className="container mx-auto my-16 flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-8">
        <h3 className="text-2xl font-bold text-left">상품 등록하기</h3>
        <button
          className={`rounded-md px-4 py-2 text-white ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-main'}`}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <h4 className="text-lg font-semibold">상품 이미지</h4>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          initialPreview={initialPreview}
          onChange={(name, file) => handleChange(name, file)}
        />

        <h4 className="text-lg font-semibold">상품명</h4>
        <input
          type="text"
          name="title"
          value={values.title}
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
          className="bg-coolgray100 border-none w-full h-14 rounded-md px-4 mb-4"
        />

        <h4 className="text-lg font-semibold">상품 소개</h4>
        <textarea
          name="content"
          value={values.content}
          placeholder="상품 소개를 입력해주세요"
          onChange={handleInputChange}
          className="bg-coolgray100 border-none w-full h-52 rounded-md px-4 mb-4 resize-none"
        />

        <h4 className="text-lg font-semibold">판매가격</h4>
        <input
          type="text"
          name="price"
          value={values.price}
          placeholder="판매 가격을 입력해주세요"
          onChange={handleInputChange}
          className="bg-coolgray100 border-none w-full h-14 rounded-md px-4 mb-4"
        />

        <h4 className="text-lg font-semibold">태그</h4>
        <input
          type="text"
          value={inputTag}
          onChange={handleTagInput}
          onKeyDown={inputKeyDown}
          placeholder="태그를 입력해주세요 (엔터를 누르면 태그가 적용돼요)"
          className="bg-coolgray100 border-none w-full h-14 rounded-md px-4 mb-4"
        />
        <div className="flex gap-2 mt-2">
          {tags.map((tag, index) => (
            <div key={index} className="bg-coolgray100 text-coolgray800 rounded-full py-2 px-4 flex items-center gap-2">
              {tag}
              <img
                src={icon_tag_remove}
                onClick={() => removeTag(index)}
                className="w-5 h-5 cursor-pointer"
                alt="Remove tag"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default AddItem;
