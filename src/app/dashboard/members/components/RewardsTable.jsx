import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";

const RewardsTable = () => {
    const [rewards, setRewards] = useState([]);
    const [totalRewards, setTotalRewards] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const itemsPerPage = 5;
  
    useEffect(() => {
      const fetchRewards = async () => {
        try {
            const API_BASE_URL = import.meta.env.VITE_LOCALHOST_IP;
            const response = await fetch(`http://${API_BASE_URL}/v1/member/rewards/all`, {
                method: "GET",
                credentials: "include",
                headers: {
                contentType: "application/json",
                },
            });
    
          if (!response.ok) throw new Error("Failed to fetch rewards");
  
          const data = await response.json();
          setTotalRewards(data.total_rewards);
          setRewards(data.rewards || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRewards();
    }, []);
  
    const toggleSort = (column) => {
      if (sortBy === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    };
  
    const getSortIcon = (column) => {
      if (sortBy !== column) return <ChevronsUpDown className='inline w-4 h-4' />;
      return sortOrder === 'asc' ? <ChevronUp className='inline w-4 h-4' /> : <ChevronDown className='inline w-4 h-4' />;
    };
  
    const filteredData = rewards.filter(reward =>
      reward.reward_from_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const sortedData = [...filteredData].sort((a, b) => {
      if (!sortBy) return 0;
      const valA = a[sortBy];
      const valB = b[sortBy];
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
    if (loading) return <p>Loading rewards...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
  
    const getInitials = (name) => {
        const words = name.split(" ");
        return words.length > 1
          ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
          : words[0][0].toUpperCase();
    };
  
    return (
      <>
        <Input
          type="text"
          placeholder="Search Reward From..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-[75w-full sm:w-[200px] md:w-auto lg:w-[350px]]"
        />
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Reward From</TableHead>
              <TableHead onClick={() => toggleSort('reward_source_type')} className='cursor-pointer'>
                Reward Source Type {getSortIcon('reward_source_type')}
              </TableHead>
              <TableHead onClick={() => toggleSort('title')} className='cursor-pointer'>
                Title {getSortIcon('title')}
              </TableHead>
              <TableHead>Points</TableHead>
              <TableHead onClick={() => toggleSort('created_at')} className='cursor-pointer'>
                Date {getSortIcon('created_at')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No rewards found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((reward, index) => (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>{getInitials(reward.reward_from_name)}</AvatarFallback>
                    </Avatar>
                    {reward.reward_from_name}
                  </TableCell>
                  <TableCell>{reward.reward_source_type}</TableCell>
                  <TableCell>{reward.title}</TableCell>
                  <TableCell>{reward.reward_points}</TableCell>
                  <TableCell>{new Date(reward.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
  
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  };
  
  export default RewardsTable;