"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "from-emerald-500 to-teal-500";
      case "medium":
        return "from-amber-500 to-orange-500";
      case "low":
        return "from-red-500 to-rose-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getDemandBadgeVariant = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "success";
      case "medium":
        return "warning";
      case "low":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-emerald-500", bgColor: "bg-emerald-500/10" };
      case "neutral":
        return { icon: LineChart, color: "text-amber-500", bgColor: "bg-amber-500/10" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500", bgColor: "bg-red-500/10" };
      default:
        return { icon: LineChart, color: "text-gray-500", bgColor: "bg-gray-500/10" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;
  const outlookBgColor = getMarketOutlookInfo(insights.marketOutlook).bgColor;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Industry Insights</h1>
          <p className="text-muted-foreground">Real-time market analysis and trends</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Sparkles className="h-3 w-3 mr-2" />
          Last updated: {lastUpdatedDate}
        </Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Outlook
            </CardTitle>
            <div className={`p-2 rounded-xl ${outlookBgColor}`}>
              <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{insights.marketOutlook}</div>
            <p className="text-sm text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Industry Growth
            </CardTitle>
            <div className="p-2 rounded-xl bg-violet-500/10">
              <TrendingUp className="h-5 w-5 text-violet-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="h-2" />
          </CardContent>
        </Card>

        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Demand Level
            </CardTitle>
            <div className="p-2 rounded-xl bg-purple-500/10">
              <BriefcaseIcon className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold">{insights.demandLevel}</span>
              <Badge variant={getDemandBadgeVariant(insights.demandLevel)}>
                {insights.demandLevel}
              </Badge>
            </div>
            <div
              className={`h-2 w-full rounded-full bg-gradient-to-r ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Skills
            </CardTitle>
            <div className="p-2 rounded-xl bg-pink-500/10">
              <Brain className="h-5 w-5 text-pink-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/10">
              <LineChart className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <CardTitle className="text-xl">Salary Ranges by Role</CardTitle>
              <CardDescription>
                Displaying minimum, median, and maximum salaries (in thousands)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl p-4 shadow-xl">
                          <p className="font-bold text-foreground mb-2">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">{item.name}:</span> ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#a78bfa" name="Min Salary (K)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="median" fill="#8b5cf6" name="Median Salary (K)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="max" fill="#7c3aed" name="Max Salary (K)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <CardTitle className="text-xl">Key Industry Trends</CardTitle>
                <CardDescription>
                  Current trends shaping the industry
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3 group">
                  <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 group-hover:scale-125 transition-transform" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/10">
                <Brain className="h-5 w-5 text-pink-500" />
              </div>
              <div>
                <CardTitle className="text-xl">Recommended Skills</CardTitle>
                <CardDescription>Skills to consider developing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1.5 hover:bg-violet-500/10 hover:border-violet-500/50 transition-colors cursor-default">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
