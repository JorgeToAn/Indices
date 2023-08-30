import { Flex, Group } from '@mantine/core';
import { Select } from '@mantine/core';
import Header from './../components/header';

const IndicePermanencia = () => {
    return(
        <div style={{
            width: '100vw',
            padding: '3vw',
        }}>
            <Header color="toronja" section="Indices" title="Permanencia por cohorte generacional" route="indices/permanencia" />
            <Flex direction="column">
                <Group>
                    <Select label="Programa educativo" placeholder='' data={[
                        {value: 'Sistemas computacionales', label:"Sistemas computacionales"},
                        {value: 'Quimica', label:"Quimica"},
                        {value: 'Industrial', label:"Industrial"},
                    ]} />
                </Group>
            </Flex>
        </div>
    );
};

export default IndicePermanencia;