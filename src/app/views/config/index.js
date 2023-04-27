import React from 'react';
import { useNavigate } from 'react-router';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';

import './config.scss';
import { NavigationButton } from '../../components/Buttons';

import { setGameConfig } from '../../store/GameSlice';
import { useDispatch, useSelector } from 'react-redux';

const ConfigView = ()=>{
    const navigate = useNavigate();
    const configDispatch = useDispatch();
    const gameConfig = useSelector(state => state.gameConfig);

    const handleConfigurationSubmit = (values, formikProps)=>{
        const { setSubmitting } = formikProps; 
        setSubmitting(true);
        configDispatch(setGameConfig({
            ...values,
            ...{
                player1: values.player1.toUpperCase(),
                player2: values.player2.toUpperCase(),
            }
        }));
        navigate('/game');
        setSubmitting(false);
    };

    const initialValues = {
        mode: gameConfig?.mode || 'single',
        level: gameConfig?.level || 'normal',
        sizeX: gameConfig?.sizeX || 15,
        sizeY: gameConfig?.sizeY || 15,
        player1: gameConfig?.player1 || '',
        player2: gameConfig?.player2 || ''
    };

    const validations = Yup.object().shape({
        mode: Yup.string(),
        player1: Yup.string()
            .min(3, 'Player 1 must have at least 3 letters')
            .required('You must provide a name for Player 1'),
        player2: Yup.string()
            .when('mode', {
                is: mode => mode === 'multi',
                then: () => Yup.string()
                    .min(3, 'Player 2 must have at least 3 letters')
                    .required('You must provide a name for Player 2')
            }),
        sizeX: Yup.number()
            .min(10, 'The minimum number of columns is 10')
            .max(50, 'The maximum number of columns is 50'),
        sizeY: Yup.number()
            .min(10, 'The minimum number of rows is 10')
            .max(50, 'The maximum number of rows is 50')
    });

    return (
        <div className='view config-view'>
            <div className='view-content'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validations}
                    onSubmit={handleConfigurationSubmit}
                    render={( formikProps ) => {
                        const { isSubmitting } = formikProps;
                        return (
                            <Form onSubmit={formikProps.handleSubmit} className='config-form'>
                                <fieldset>
                                    <label htmlFor='mode'>MODE</label>
                                    <Field as='select' name='mode' >
                                        <option value='single'>SINGLE PLAYER</option>
                                        <option value='multi'>MULTI PLAYER</option>
                                    </Field>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor='player1'>PLAYER 1:</label>
                                    <Field type='text' name='player1' />
                                    <ErrorMessage name='player1' component='span' className='field-error' />
                                </fieldset>
                                {formikProps.values.mode==='multi' &&
                                    <fieldset>
                                        <label htmlFor='player2'>PLAYER 2:</label>
                                        <Field type='text' name='player2' />
                                        <ErrorMessage name='player2' component='span' className='field-error' />
                                    </fieldset>
                                }
                                <fieldset>
                                    <label htmlFor='level'>LEVEL</label>
                                    <Field as='select' name='level' >
                                        <option value='easy'>EASY</option>
                                        <option value='normal'>NORMAL</option>
                                        <option value='hard'>HARD</option>
                                    </Field>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor='level'>SIZE</label>
                                    <Field type='number' name='sizeX' min='10' max='50' />
                                    <label htmlFor='level'>x</label>
                                    <Field type='number' name='sizeY' min='10' max='50' />
                                    <ErrorMessage name='sizeX' component='span' className='field-error' />
                                    <ErrorMessage name='sizeY' component='span' className='field-error' />
                                </fieldset>
                                <div className='view-menu config-menu'>
                                    <Field type="submit" className='btn' title='Start' disabled={isSubmitting} value='START' />
                                </div>
                            </Form>
                        );
                    }}
                />
            </div>
            <div>
                <NavigationButton className="btn-yellow" icon='faArrowLeft' to='/' >GO BACK TO MENU</NavigationButton>
            </div>
        </div>
    );
};
export default ConfigView;