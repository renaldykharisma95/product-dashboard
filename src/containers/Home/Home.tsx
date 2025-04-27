"use client";

import { Box, Flex, Heading } from "@chakra-ui/react";
import averageratingdata from "./average-rating-category.json";
import productcountdata from "./product-count-category.json";
import pricedistributiondata from "./price-distribution.json";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#3182CE", "#63B3ED", "#90CDF4", "#BEE3F8"];

const Home = () => {
  return (
    <Box w="100%" px={8}>
      <Flex justifyContent="space-between" gap={12} alignItems="center">
        <Box h="fit-content" w="full">
          <Heading size="md" mb={4} textAlign="center">
            Average Rating per Category
          </Heading>
          <Box
            w="full"
            maxW="800px"
            h="400px"
            p={4}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            boxShadow="lg"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={averageratingdata}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[3.5, 4.1]} />
                <Tooltip />
                <Bar
                  dataKey="averageRating"
                  fill="#3182CE"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box h="fit-content" w="full">
          <Heading size="md" mb={4} textAlign="center">
            Product Distribution by Category
          </Heading>
          <Box
            w="full"
            maxW="800px"
            h="400px"
            p={4}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            boxShadow="lg"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productcountdata}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  label
                >
                  {productcountdata.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Flex>
      <Box h="fit-content" w="full" py={16}>
        <Heading size="md" mb={4} textAlign="center">
          Price Distribution (Top 10 by ID)
        </Heading>
        <Box
          w="full"
          maxW="800px"
          h="400px"
          p={4}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="2xl"
          boxShadow="lg"
          mx="auto"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pricedistributiondata}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="title"
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3182CE"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
