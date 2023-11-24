import { getProductsByParams } from './img-api';

const fetchData = async () => {
  const params = {
    keyword: '',
    category: 'Fresh_Produce',
    page: 3,
  };

  try {
    const data = await getProductsByParams(params);
    console.log(data);
    console.log(data.page);
    console.log(data.totalPages);
  } catch (error) {
    console.error('Ошибка получения данных', error);
  }
};

fetchData();
