import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmActivation from '@/components/ConfirmActivation';
import Cookies  from 'js-cookie';
const MembersTable = ({ members, onActivate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycStatus, setKycStatus] = useState('all');
  const [activationStatus, setActivationStatus] = useState('all');
  const [membersList, setMembersList] = useState(members);

  const accountType = Cookies.get("account_type")

  const getAvatarFallback = (firstName, lastName) => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKycStatusChange = (value) => {
    setKycStatus(value);
  };

  const handleActivationStatusChange = (value) => {
    setActivationStatus(value);
  };

  const handleActivateSuccess = (userId) => {
    setMembersList((prevMembers) =>
      prevMembers.map((member) =>
        member.user_id === userId ? { ...member, is_activated: true } : member
      )
    );
  };
  

  const filteredMembers = membersList.filter((member) => {
    const matchesSearchTerm = member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             member.mobile_number.includes(searchTerm);

    const matchesKycStatus = kycStatus === 'all' || 
                             (kycStatus === 'verified' && member.is_kyc_verified) || 
                             (kycStatus === 'not_verified' && !member.is_kyc_verified);

    const matchesActivationStatus = activationStatus === 'all' || 
                                   (activationStatus === 'activated' && member.is_activated) || 
                                   (activationStatus === 'not_activated' && !member.is_activated);

    return matchesSearchTerm && matchesKycStatus && matchesActivationStatus;
  });

  return (
      <>
          <h2>Community Members</h2>

          <div className="flex items-center gap-4 mb-2">
            <Input 
              placeholder="Search Members..." 
              className="w-[300px]" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Select value={kycStatus} onValueChange={handleKycStatusChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="KYC Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">KYC</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="not_verified">Not Verified</SelectItem>
              </SelectContent>
            </Select>
            <Select value={activationStatus} onValueChange={handleActivationStatusChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Activation Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Is Activated</SelectItem>
                <SelectItem value="activated">Activated</SelectItem>
                <SelectItem value="not_activated">Not Activated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-auto h-[60vh] border rounded-lg p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile Number</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Activation Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.user_id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {getAvatarFallback(member.first_name, member.last_name)}
                          </AvatarFallback>
                        </Avatar>
                        {member.first_name} {member.middle_name} {member.last_name} {member.suffix_name || ""}
                      </div>
                    </TableCell>
                    <TableCell>{member.mobile_number}</TableCell>
                    <TableCell>{member.is_kyc_verified ? "✅ Yes" : "❌ No"}</TableCell>
                    <TableCell>{member.is_activated ? "✅ Yes" : "❌ No"}</TableCell>
                    
                    {/* Actions Dropdown */}
                    { (accountType == "ADMIN" || accountType == "LEADER") && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            {/* Activate Account if not activated */}
                            {!member.is_activated && (
                              <DropdownMenuItem asChild>
                                
                                <ConfirmActivation
                                  title="Activate Account?"
                                  description=""
                                  onConfirm={() => onActivate(member.user_id)}
                                  triggerText="Activate Account"
                                  user={{
                                    id: member.user_id,
                                    name: `${member.first_name} ${member.middle_name || ''} ${member.last_name} ${member.suffix_name || ''}`.trim(),
                                    mobile_number: member.mobile_number,
                                  }}
                                  onActivateSuccess={handleActivateSuccess}
                                />

                              </DropdownMenuItem>
                            )}

                            <DropdownMenuSeparator />
                            
                            {/* View Details */}
                            <DropdownMenuItem>
                              <Link to={`/dashboard/member/${member.user_id}`} className="w-full">
                                View Details
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}




                  </TableRow>
                ))}
              </TableBody>  
            </Table>
          </div>
        </>

  );
};

export default MembersTable;