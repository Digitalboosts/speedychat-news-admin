import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getGeneratedCoupon } from "../redux/allApiCall/action";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DataTable = () => {

  const { allCoupon } = useSelector((state) => state.Allapicall);
  console.log('allCoupon:', allCoupon)
  const dispatch = useDispatch()
  useEffect(() => {
 dispatch(getGeneratedCoupon())
  }, []);
  // deleteCoupon
  const handleDelete = async(index) => {
   if (index){
    const response  = await dispatch(deleteCoupon(index))
      await dispatch(getGeneratedCoupon())
      toast.success('Coupon Deleted Successfully')

   }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Percentage</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Min Amount</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Max Amount</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Start Date</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>End Date</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Coupon Code</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Max User Allowed</TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>Users Used</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCoupon?.map((coupon, index) => (
            <TableRow key={index}>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{coupon.name}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{coupon.percentage}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{coupon.min_amount}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{coupon.max_amount}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{new Date(coupon.start_date).toLocaleDateString()}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{new Date(coupon.end_date).toLocaleDateString()}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{coupon.coupon_code}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{coupon.max_user_allowed}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{coupon.users_used?.length}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(coupon?._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
