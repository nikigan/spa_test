import React from 'react';
import './FavoriteForm.scss';
import {Col, Form, Input, InputNumber, Row, Select, Slider} from "antd";
import {connect} from "react-redux";


const {Option} = Select;

const FavoriteForm = ({form, modal: {query, edit, name, sortBy, maxCount}}) => {

  const required = (message) => {
    return [{
      required: true,
      message: message
    }]
  };

  return (
    <Form
      form={form}
      layout='vertical'
      fields={[
        {
          name: ['query'],
          value: query
        },
        {
          name: ['name'],
          value: name
        },
        {
          name: ['sortBy'],
          value: sortBy
        },
        {
          name: ['maxCount'],
          value: maxCount
        }
      ]}>
      <Form.Item name='query' label="Запрос">
        <Input disabled={!edit}/>
      </Form.Item>
      <Form.Item name='name' label="Название" rules={required('Введите название запроса!')}>
        <Input placeholder="Укажите название"/>
      </Form.Item>
      <Form.Item name='sortBy' label="Сортировать по">
        <Select placeholder="Без сортировки">
          <Option value=''>Без сортировки</Option>
          <Option value='viewCount'>По количеству просмотров</Option>
          <Option value='rating'>По рейтингу</Option>
          <Option value='relevance'>По релевантности</Option>
          <Option value='title'>По названию</Option>
        </Select>
      </Form.Item>
      <Form.Item label='Количество видео'>
        <Row>
        <Col span={19}>
          <Form.Item name='maxCount'>
            <Slider
              style={{marginRight: '16px'}}
              max={50}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name='maxCount'>
            <InputNumber
              min={0}
              max={50}
            />
          </Form.Item>
        </Col>
      </Row></Form.Item>
    </Form>
  );
};

export default connect(({modal}) => ({modal}))(FavoriteForm);