import React from 'react';
import './FavoriteModal.scss';
import {Form, Modal} from "antd";
import 'antd/es/modal/style/css';
import 'antd/es/form/style/css';
import 'antd/es/select/style/css';
import 'antd/es/slider/style/css';
import 'antd/es/input-number/style/css'
import {onFavoriteModalClose, onFavoriteModalSave, onFavoriteModalSaveChanges} from "../../actions";
import {connect} from "react-redux";
import FavoriteForm from "../FavoriteForm";


const FavoriteModal = ({show, edit, onFavoriteModalClose, onFavoriteModalSave, onFavoriteModalSaveChanges}) => {

  const [form] = Form.useForm();
  
  return (
      <Modal
        title="Сохрарнение запроса"
        visible={show}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              if (edit){
                onFavoriteModalSaveChanges(values);
              }
              else {
                onFavoriteModalSave(values);
              }
            })
            .catch(error => console.log(error));
        }}
        okText={edit? 'Изменить' : 'Сохранить'}
        cancelText={edit? 'Не изменять' : 'Не сохранять'}
        onCancel={() => {
          form.resetFields();
          onFavoriteModalClose();
        }}
      >
        <FavoriteForm form={form}/>
      </Modal>
  );
};


export default connect(({modal: {show, edit}}) => ({show, edit}), {onFavoriteModalClose, onFavoriteModalSave, onFavoriteModalSaveChanges})(FavoriteModal);