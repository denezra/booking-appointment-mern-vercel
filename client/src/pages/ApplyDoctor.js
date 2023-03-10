import React from 'react';
import Layout from '../components/Layout';
import apiConfig from '../config/apiConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { useDispatch, useSelector } from 'react-redux';
import DoctorForm from '../components/DoctorForm';
import moment from 'moment';

function ApplyDoctor()
{
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.user);
	const onFinish = async values =>
	{
		try
		{
			dispatch(showLoading());
			const response = await apiConfig.post(
				'/user/apply-doctor-account',
				{
					...values,
					userId: user._id,
					timings: [
						moment(values.timings[ 0 ]).format('HH:mm'),
						moment(values.timings[ 1 ]).format('HH:mm'),
					],
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			dispatch(hideLoading());
			if (response.data.success)
			{
				toast.success(response.data.message);
				navigate('/');
			} else
			{
				dispatch(hideLoading());
				toast.error(response.data.message);
			}
		} catch (error)
		{
			dispatch(hideLoading());
			toast.error('Something went wrong');
		}
	};
	return (
		<Layout>
			<h1 className="page-title">Apply Doctor</h1>
			<hr />
			<DoctorForm onFinish={onFinish} />
		</Layout>
	);
}

export default ApplyDoctor;
