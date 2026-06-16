import React, { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';

export default function InfoCard({ children }: { children: ReactNode }) {

  return (
    <div className="flex">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
