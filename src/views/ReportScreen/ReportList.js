import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import { Text, ListItem, Icon, CheckBox } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container } from '../../styles/layoutStyle';
import Header from '../../components/Header';
import { primary, danger } from '../../styles/color';
import PillButton from '../../components/CustomButton/PillButton';
import { COLORS, FONTS } from '../../styles';
import storageApi from '../../api/storageApi';
import moment from 'moment';
import { simplifyString } from './../../utils/simplifyString';
import PrimaryButton from './../../components/CustomButton/PrimaryButton';
import { exportExcel } from '../../services/export';
import reportApi from '../../api/reportApi';
import ModalMess from '../../components/ModalMess';
import Loading from '../../components/Loading';

const ReportList = ({ navigation }) => {
  const [_start, setStart] = useState(0);
  const [data, setData] = useState([]);
  const [exportList, setExportList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);
  const [field, setField] = useState('_q');
  const [value, setValue] = useState('');

  const [check, setCheck] = useState(
    Array.from({ length: data.length }, (_, index) => false),
  );

  const handleCheck = useCallback(
    index => {
      check[index] = !check[index];
      setCheck([...check]);
      if (check[index]) {
        setExportList([...exportList, data[index].id]);
      } else {
        setExportList([
          ...exportList.filter(item => {
            return item !== data[index].id;
          }),
        ]);
      }
    },
    [data, exportList],
  );

  const handleCheckAll = () => {
    setCheck(Array.from({ length: data.length }, (_, index) => true));
    setExportList(data.map(item => item.id));
  };

  const handleUnCheckAll = () => {
    setCheck(Array.from({ length: data.length }, (_, index) => false));
    setExportList([]);
  };

  const handleExport = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.log(err);
    }
    const readGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const writeGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!readGranted || !writeGranted) {
      setAlert({
        type: 'danger',
        message: 'Chưa cấp quyền',
      });
      return;
    }
    setLoading(<Loading />);
    Promise.all(exportList.map(item => reportApi.getDetail(item)))
      .then(responses => {
        responses.forEach(data => {
          exportExcel(JSON.parse(data.report));
        });
        setExportList([]);
        setCheck(Array.from({ length: data.length }, (_, index) => false));
        setLoading(null);
        setAlert({
          type: 'success',
          message: 'Lưu báo cáo thành công tại thư mục Download',
        });
      })
      .catch(error => console.log(error));
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.id + index}
      onLongPress={() => handleCheck(index)}
      onPress={() =>
        check.some(item => item === true)
          ? handleCheck(index)
          : navigation.navigate('EditReport', item)
      }>
      <ListItem containerStyle={style.reportItem}>
        <View style={style.item}>
          <Icon
            size={30}
            name="description"
            iconStyle={{
              color: '#FFF',
            }}
            containerStyle={{
              backgroundColor: COLORS.header,
              padding: 10,
              borderRadius: 25,
            }}
          />
        </View>
        <ListItem.Content>
          <ListItem.Title style={FONTS.Smol}>
            ID: {simplifyString(item.id, 20)}
          </ListItem.Title>
          <ListItem.Subtitle>
            Cập nhật: {moment(item.updatedAt).format('DD/MM/YYYY HH:mm')}
          </ListItem.Subtitle>
        </ListItem.Content>
        {check.some(item => item === true) ? (
          <ListItem.CheckBox
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={check[index]}
            checkedColor={primary}
          />
        ) : (
          <ListItem.Chevron size={20} />
        )}
      </ListItem>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    storageApi
      .reportList({ _start: _start, [field]: value })
      .then(response => {
        console.log(response);
        setData(response);
      })
      .catch(error => {
        setLoading(null);
      });
  };

  const handleCancel = () => {
    setValue('');
  };

  const handleClear = () => {
    setValue('');
    storageApi
      .reportList({ _start: 0 })
      .then(response => {
        setLoading(null);
        setData(response);
      })
      .catch(error => {
        setLoading(null);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(<Loading />);
      storageApi
        .reportList({ _start: 0 })
        .then(response => {
          setLoading(null);
          setData(response);
        })
        .catch(error => {
          setLoading(null);
        });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setStart(0);
      setExportList([]);
      setCheck([]);
      setValue('');
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (_start) {
      storageApi
        .reportList({ _start: _start })
        .then(response => {
          setData([...data, ...response]);
        })
        .catch(error => {
          setLoading(null);
        });
    }
  }, [_start]);

  return (
    <SafeAreaView style={style.container}>
      {loading}
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          alert={alert}
          setAlert={setAlert}
        />
      )}
      <Header headerText={'Danh sách báo cáo'} />
      <View style={{ width: '100%', paddingHorizontal: 10, display: 'flex' }}>
        {check.some(item => item === true) ? (
          <TouchableOpacity onPress={handleUnCheckAll}>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: danger,
                marginRight: 10,
                fontSize: 17,
              }}>
              Huỷ
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleCheckAll}>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: primary,
                marginRight: 10,
                fontSize: 17,
              }}>
              Chọn tất cả
            </Text>
          </TouchableOpacity>
        )}

        <CustomSearch
          value={value}
          onChangeText={setValue}
          onSubmitEditing={handleSearch}
          onClear={handleClear}
          onCancel={handleCancel}
        />
      </View>

      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={
          <View style={style.noData}>
            <Text>Chưa có lịch sử báo cáo</Text>
          </View>
        }
        ListFooterComponent={
          data.length > 5 && (
            <View style={{ padding: 20 }}>
              <PillButton
                onPress={() => setStart(_start + 1)}
                title="Xem thêm"
              />
            </View>
          )
        }
      />
      {check.some(item => item === true) && (
        <View style={{ padding: 20, paddingBottom: 30 }}>
          <PrimaryButton
            title="In báo cáo"
            buttonStyle={{
              backgroundColor: primary,
            }}
            onPress={handleExport}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: { ...container, alignItems: 'stretch' },
  reportItem: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: COLORS.gray,
    marginVertical: 15,
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
  noData: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '50%',
  },
  item: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 15,
  },
});

export default ReportList;
