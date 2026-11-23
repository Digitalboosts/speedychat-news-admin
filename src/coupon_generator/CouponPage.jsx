import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Box,
  Grid,
  Typography,
  Button,
  Alert
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Day.js Adapter
import dayjs from 'dayjs'; // Day.js for date formatting
import { useDispatch, useSelector } from 'react-redux';
import { generateCoupon } from '../redux/allApiCall/action';
const CouponPage = () => {
  const [couponDetails, setCouponDetails] = useState({
    name: '',
    discountType: 'percent',
    discount_percentage: '',
    min_amount: '',
    max_amount: '',
    max_user_allowed: '',
    one_user: false,
    start_date: null,
    end_date: null
  });
   
  const [couponGenerated, setCouponGenerated] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const dispatch =  useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCouponDetails({
      ...couponDetails,
      [name]: name === 'percentage' ? Math.max(0, Number(value)) : value,
    });
  };

  const handleDateChange = (name, newValue) => {
    // Ensure the newValue is a valid Day.js object
    const formattedDate = newValue ? dayjs(newValue) : null;
    setCouponDetails({
      ...couponDetails,
      [name]: formattedDate
    });
  };
  const handleSwitchChange = (event) => {
    setCouponDetails({
      ...couponDetails,
      [event.target.name]: event.target.checked
    });
  };
  const generateCouponCode = () => {
    return 'COUPON-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      ...couponDetails,
      // Format dates as 'YYYY-MM-DD' before logging or submitting the form
      startDate: couponDetails.startDate ? couponDetails.startDate.format('YYYY-MM-DD') : null,
      endDate: couponDetails.endDate ? couponDetails.endDate.format('YYYY-MM-DD') : null,
    };
  
    try {
      const response = await dispatch(generateCoupon(data));
      console.log(response);
      setGeneratedCode(response?.data.coupon_code);
      setCouponGenerated(true);
    } catch (error) {
      console.error('Error generating coupon:', error);
    }
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Create Discount Coupon
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>

          

            {/* User Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="User Name"
                name="name"
                value={couponDetails.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Discount Type */}
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Discount Type</FormLabel>
                <RadioGroup
                  row
                  name="discountType"
                  value={couponDetails.discountType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="percent"
                    control={<Radio />}
                    label="Percentage Discount"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Percentage Discount */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Percentage Discount"
                name="discount_percentage"
                type="number"
                value={couponDetails.discount_percentage}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  endAdornment: '%',
                }}
              />
            </Grid>

            {/* Min/Max Purchase Amount */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Minimum Purchase Amount"
                name="min_amount"
                type="number"
                value={couponDetails.min_amount}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Maximum Discount Amount"
                name="max_amount"
                type="number"
                value={couponDetails.max_amount}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Number of Times Coupon Can Be Used */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Number of Times Coupon Can Be Used"
                name="max_user_allowed"
                type="number"
                value={couponDetails.max_user_allowed}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* One Coupon per User */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={couponDetails.one_user}
                    onChange={handleSwitchChange}
                    name="one_user"
                  />
                }
                label="1 Coupon per User"
              />
            </Grid>

            {/* Start Date */}
            <Grid item xs={6}>
              <DatePicker
                label="Start Date"
                value={couponDetails.start_date}
                onChange={(newValue) => handleDateChange('start_date', newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={6}>
              <DatePicker
                label="End Date"
                value={couponDetails.end_date}
                onChange={(newValue) => handleDateChange('end_date', newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
           
             {/* Success Message */}
             {couponGenerated && (
              <Grid item xs={12}>
                <Alert severity="success">
                  Coupon successfully created! Your generated coupon code is: <strong>{generatedCode}</strong>
                </Alert>
              </Grid>
            )}
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Coupon
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default CouponPage;
