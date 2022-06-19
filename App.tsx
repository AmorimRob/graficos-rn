import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {VictoryPie, VictoryTooltip} from 'victory-native';
import {Gastos} from './assets/gastos';
import {Meses} from './assets/meses';

const App = () => {
  const [selecionado, setSelecionado] = useState<number | null>();
  const [data, setData] = useState([]);
  const [mes, setMes] = useState('Janeiro');

  const handleItemSelecionado = (id: number) => {
    setSelecionado(prev => (prev === id ? null : id));
  };

  const tagEstilo = (cor: string) => {
    return {
      width: 10,
      marginBottom: 10,
      backgroundColor: cor,
    };
  };

  useEffect(() => {
    setData(Gastos[mes]);
  }, [mes]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.meses}>
          {Meses.map(mes => {
            return (
              <TouchableOpacity onPress={() => setMes(mes.label)}>
                <Text>{mes.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.chart}>
          <VictoryPie
            data={data}
            x="label"
            y="value"
            colorScale={data.map(g => g.color)}
            innerRadius={80}
            animate={{
              easing: 'bounce',
            }}
            style={{
              labels: {
                fill: '#FFFF',
              },
              data: {
                fillOpacity: ({datum}) => (datum.id === selecionado ? 1 : 0.5),
                stroke: ({datum}) =>
                  datum.id === selecionado ? datum.color : 'none',
                strokeWidth: 10,
                strokeOpacity: ({datum}) =>
                  datum.id === selecionado ? 1 : 0.5,
              },
            }}
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea={true}
                renderInPortal={false}
                flyoutStyle={{
                  stroke: 0,
                  fill: ({datum}) => datum.color,
                }}
              />
            }
          />
        </View>
        <View>
          <FlatList
            data={Gastos[mes]}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <View style={tagEstilo(item.color)} />
                <TouchableOpacity
                  style={styles.cardDespesa}
                  onPress={() => handleItemSelecionado(item.id)}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#E1e1ef',
    paddingTop: 54,
  },

  chart: {
    alignItems: 'center',
    width: '100%',
  },
  cardDespesa: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  meses: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
});

export default App;
