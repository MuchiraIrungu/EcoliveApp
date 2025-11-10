import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Investment } from '../../lib/mock-data';
import { TrendingUp, Award, Droplet, ExternalLink } from 'lucide-react';
import { Progress } from '../ui/progress';

interface PortfolioProps {
  investments: Investment[];
}

export function Portfolio({ investments }: PortfolioProps) {
  const totalPollinationCredits = investments.reduce((sum, inv) => sum + inv.pollinationCredits, 0);
  const totalHoneyYield = investments.reduce((sum, inv) => sum + inv.honeyYield, 0);

  const viewOnChain = (tokenId: string) => {
    // Simulate viewing on Hedera mirror node
    window.open(`https://hashscan.io/testnet/token/${tokenId}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Hives Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-900">{investments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pollination Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-gray-900">{totalPollinationCredits}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Honey Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Droplet className="h-5 w-5 text-amber-600 mr-2" />
              <p className="text-gray-900">{totalHoneyYield.toFixed(1)} kg</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Details */}
      <Card>
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
          <CardDescription>
            View your owned hive tokens and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {investments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No investments yet</p>
              <p className="text-gray-500">Start investing in hives to see your portfolio here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {investments.map((investment) => (
                <Card key={investment.id} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-gray-900 mb-1">{investment.hiveName}</h3>
                          <p className="text-gray-600">Token ID: {investment.tokenId}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Investment Date</span>
                            <span className="text-gray-900">{investment.investmentDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Initial Investment</span>
                            <span className="text-gray-900">${investment.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Value</span>
                            <span className="text-gray-900">${investment.currentValue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Profit/Loss</span>
                            <div className="flex items-center">
                              <TrendingUp className={`h-4 w-4 mr-1 ${investment.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                              <span className={investment.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {investment.profitPercentage >= 0 ? '+' : ''}{investment.profitPercentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Pollination Credits</span>
                            <Badge variant="secondary">
                              <Award className="h-3 w-3 mr-1" />
                              {investment.pollinationCredits}
                            </Badge>
                          </div>
                          <Progress value={(investment.pollinationCredits / 150) * 100} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Honey Yield</span>
                            <Badge variant="secondary">
                              <Droplet className="h-3 w-3 mr-1" />
                              {investment.honeyYield} kg
                            </Badge>
                          </div>
                          <Progress value={(investment.honeyYield / 20) * 100} className="h-2" />
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => viewOnChain(investment.tokenId)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View on Hedera
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
