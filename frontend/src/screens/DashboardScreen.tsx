import { useLocation } from 'react-router-dom';
import { DashboardMenu } from '../components/DashboardMenu';
import { ProductListScreen } from './ProductListScreen';
import { OrderListScreen } from './OrderListScreen';
import { useEffect, useState } from 'react';
import { getStoreData } from '../utils/api';
import { apiEndpoints, initSummary } from '../utils/constants';
import { LineChart, PieChart } from 'chartist';

export const DashboardScreen = () => {
  const location = useLocation();
  const activePath = location.pathname.split('/')[2];

  const dashBoardContents: { [key: string]: any } = {
    orderlist: <OrderListScreen />,
    productlist: <ProductListScreen />,
  };

  return (
    <div className='dashboard'>
      <DashboardMenu selected={activePath as string} />
      <div className='dashboard-content'>
        {activePath ? dashBoardContents[activePath] : <DashboardHome />}
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const [summary, setSummary] = useState<any>(initSummary);

  useEffect(() => {
    getStoreData(apiEndpoints.summary)
      .then((res) => {
        setSummary(res);
      })
      .catch((err) => {
        console.log(err);
      });
    new LineChart(
      '.ct-chart-line',
      {
        labels: summary?.dailyOrders?.map((x: unknown) => (x as any)._id),
        series: [summary?.dailyOrders?.map((x: unknown) => (x as any).sales)],
      },
      {
        showArea: true,
      }
    );
    new PieChart(
      '.ct-chart-pie',
      {
        labels: summary?.productCategories?.map(
          (x: unknown) => (x as any)?._id || ''
        ),
        series: summary?.productCategories?.map(
          (x: unknown) => (x as any)?.count || 0
        ),
      },
      {
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        showLabel: true,
        // donutSolid: true,
      }
    );
  }, []);
  return (
    <div className='dashboard'>
      <div className='dashboard-content'>
        <h1>Dashboard</h1>

        <ul className='summary-items'>
          <li>
            <div className='summary-title color1'>
              <span>
                <i className='fa fa-users'></i> Users
              </span>
            </div>
            <div className='summary-body'>
              {summary?.users && summary?.users[0]?.numUsers}
            </div>
          </li>
          <li>
            <div className='summary-title color2'>
              <span>
                <i className='fa fa-users'></i> Orders
              </span>
            </div>
            <div className='summary-body'>
              {summary?.orders && summary?.orders[0]?.numOrders}
            </div>
          </li>
          <li>
            <div className='summary-title color3'>
              <span>
                <i className='fa fa-users'></i> Sales
              </span>
            </div>
            <div className='summary-body'>
              ${summary?.orders && summary?.orders[0]?.totalSales}
            </div>
          </li>
        </ul>
        <div className='charts'>
          <div>
            <h2>Sales</h2>
            <div className='ct-perfect-fourth ct-chart-line'></div>
          </div>
          <div>
            <h2>Categories</h2>
            <div className='ct-perfect-fourth ct-chart-pie'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
